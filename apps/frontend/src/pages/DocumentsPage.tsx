import { useQuery } from '@tanstack/react-query';
import { getDocuments } from '@/features/documents/api/documentsApi';
import AssignmentModal from '@/features/documents/components/AssignmentModal';
import { DocumentTable } from '@/features/documents/components/DocumentTable';
import { useDocumentActions } from '@/features/documents/hooks/useDocumentActions';
import { Button } from '@/components/ui/Button';

export default function DocumentsPage() {
  const {
    isSubmitting,
    isAssigning,
    pickedFiles,
    setIsAssigning,
    handleOpenPicker,
    handleAssignmentSubmit,
  } = useDocumentActions();

  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
  });

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
        <Button
          onClick={handleOpenPicker}
          disabled={isSubmitting}
          className="flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-[#0a1628] border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            'Add from Google Drive'
          )}
        </Button>
      </div>

      <DocumentTable documents={documents} isLoading={isLoading} />

      <AssignmentModal
        isOpen={isAssigning}
        files={pickedFiles}
        onClose={() => setIsAssigning(false)}
        onSubmit={handleAssignmentSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
