import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FileText, Clock, CheckCircle2, XCircle } from 'lucide-react';
import ReactGoogleDrivePicker from 'react-google-drive-picker';
import { getDocuments, embedDocuments } from '@/features/documents/api/documentsApi';
import AssignmentModal from '@/features/documents/components/AssignmentModal';
import type { FileItem, EmbedGroup } from '@/features/documents/components/AssignmentModal';

// Handle CJS/ESM interop for the picker module
const useDrivePicker = (ReactGoogleDrivePicker as any).useDrivePicker || (ReactGoogleDrivePicker as any).default || ReactGoogleDrivePicker;

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';
const GOOGLE_APP_ID = import.meta.env.VITE_GOOGLE_APP_ID || '';

function getStateIcon(state: string) {
  switch (state) {
    case 'embedded':
      return <CheckCircle2 className="w-4 h-4 text-green-400" />;
    case 'failed':
      return <XCircle className="w-4 h-4 text-red-400" />;
    case 'pending':
    default:
      return <Clock className="w-4 h-4 text-amber-400" />;
  }
}

function getStateStyles(state: string) {
  switch (state) {
    case 'embedded':
      return 'bg-green-500/10 text-green-400 border border-green-500/20';
    case 'failed':
      return 'bg-red-500/10 text-red-400 border border-red-500/20';
    case 'pending':
    default:
      return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
  }
}

export default function DocumentsPage() {
  const queryClient = useQueryClient();
  const [openPicker] = useDrivePicker();

  const [isAssigning, setIsAssigning] = useState(false);
  const [pickedFiles, setPickedFiles] = useState<FileItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
  });

  const embedMutation = useMutation({
    mutationFn: embedDocuments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
    onError: (error) => {
      console.error('Error embedding documents:', error);
      // Here you could trigger a toast notification (e.g. react-hot-toast)
    }
  });

  const handleOpenPicker = () => {
    openPicker({
      clientId: GOOGLE_CLIENT_ID,
      developerKey: GOOGLE_API_KEY,
      appId: GOOGLE_APP_ID,
      viewId: 'DOCS',
      token: '', // Used for initial auth if we already had a token, but the picker will handle OAuth popup
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      customViews: [
        {
          viewId: 'DOCS',
          mimeTypes: 'application/pdf',
        }
      ],
      callbackFunction: (data: any) => {
        if (data.action === 'picked' && data.docs) {
          const files = data.docs.map((doc: any) => ({
            id: doc.id,
            name: doc.name
          }));
          if (files.length > 0) {
            setPickedFiles(files);
            setIsAssigning(true);
          }
        }
      },
    });
  };

  const handleAssignmentSubmit = async (groups: EmbedGroup[]) => {
    setIsSubmitting(true);
    try {
      await Promise.all(
        groups.map(group => {
          const payload: any = {
            file_ids: group.files.map(f => f.id)
          };
          if (group.department) {
            payload.department = group.department;
          }
          if (group.project_id) {
            payload.project_id = group.project_id;
          }
          return embedMutation.mutateAsync(payload);
        })
      );
      setIsAssigning(false);
      setPickedFiles([]);
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    } catch (error) {
      console.error('Error in batch embedding:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Workspace Documents</h2>
          <p className="text-sm text-white/50 mt-1">
            View and manage documents available for semantic search.
          </p>
          <p className="text-xs text-amber-400/80 mt-2 flex items-center gap-1.5 bg-amber-400/10 w-fit px-2.5 py-1 rounded-md border border-amber-400/20">
            Note: Ensure selected files are shared with <span className="font-mono text-amber-400 font-semibold selection:bg-amber-400/30">enterprise-rag@enterprise-rag-489707.iam.gserviceaccount.com</span>
          </p>
        </div>
        <button
          onClick={handleOpenPicker}
          disabled={isSubmitting}
          className="px-4 py-2 bg-gradient-to-r from-[#5DD7AD] to-[#3ab88e] hover:from-[#4cc69c] hover:to-[#2aa77d] text-[#0a1628] font-medium rounded-lg shadow-lg shadow-[#5DD7AD]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-[#0a1628] border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            'Add from Google Drive'
          )}
        </button>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="bg-white/5 border-b border-white/10 text-xs uppercase text-white/50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Document Name</th>
                <th scope="col" className="px-6 py-4 font-medium">Status</th>
                <th scope="col" className="px-6 py-4 font-medium">Last Updated</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-white/40">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-[#5DD7AD] border-t-transparent rounded-full animate-spin" />
                      Loading documents...
                    </div>
                  </td>
                </tr>
              ) : documents?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-white/40">
                      <FileText className="w-12 h-12 mb-3 opacity-20" />
                      <p className="text-base font-medium text-white/60">No documents found</p>
                      <p className="text-sm mt-1">Add documents from Google Drive to get started.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                documents?.map((doc) => (
                  <tr key={doc.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                      <FileText className="w-4 h-4 text-white/40" />
                      {doc.file_name}
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStateStyles(doc.state)}`}>
                        {getStateIcon(doc.state)}
                        {doc.state}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/50">
                      {new Date(doc.updated_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm text-[#5DD7AD] hover:text-[#4cc69c] font-medium transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AssignmentModal
        isOpen={isAssigning}
        files={pickedFiles}
        onClose={() => {
          setIsAssigning(false);
          setPickedFiles([]);
        }}
        onSubmit={handleAssignmentSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
