import React, { useState, useEffect } from 'react';
import { X, FileText, GripVertical, Building2, FolderKanban, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/features/projects/api/projectsApi';
import { getDepartments } from '@/features/departments/api/departmentsApi';

export interface FileItem {
  id: string;
  name: string;
}

export interface EmbedGroup {
  department?: string;
  project_id?: string;
  files: FileItem[];
}


interface AssignmentModalProps {
  files: FileItem[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (groups: EmbedGroup[]) => void;
  isSubmitting?: boolean;
}

export default function AssignmentModal({ 
  files, 
  isOpen, 
  onClose, 
  onSubmit,
  isSubmitting 
}: AssignmentModalProps) {
  const [fileAssignments, setFileAssignments] = useState<Record<string, string>>({});
  const [draggedFileId, setDraggedFileId] = useState<string | null>(null);

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    enabled: isOpen,
  });

  const { data: departments = [] } = useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments,
    enabled: isOpen,
  });

  useEffect(() => {
    if (isOpen) {
      // Initialize all files to unassigned
      const initial: Record<string, string> = {};
      files.forEach(f => {
        initial[f.id] = 'unassigned';
      });
      setFileAssignments(initial);
    }
  }, [isOpen, files]);

  if (!isOpen) return null;

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedFileId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    if (id && files.some(f => f.id === id)) {
      setFileAssignments(prev => ({ ...prev, [id]: targetId }));
    }
    setDraggedFileId(null);
  };

  const handleDragEnd = () => {
    setDraggedFileId(null);
  };

  const unassignedFiles = files.filter(f => fileAssignments[f.id] === 'unassigned' || !fileAssignments[f.id]);
  
  const getAssignedFiles = (targetId: string) => files.filter(f => fileAssignments[f.id] === targetId);

  const handleConfirm = () => {
    const deptGroups: Record<string, FileItem[]> = {};
    const projGroups: Record<string, FileItem[]> = {};
    
    files.forEach(f => {
      const target = fileAssignments[f.id];
      if (!target || target === 'unassigned') return;
      
      if (target.startsWith('dept-')) {
        const dept = target.replace('dept-', '');
        if (!deptGroups[dept]) deptGroups[dept] = [];
        deptGroups[dept].push(f);
      } else if (target.startsWith('proj-')) {
        const projId = target.replace('proj-', '');
        if (!projGroups[projId]) projGroups[projId] = [];
        projGroups[projId].push(f);
      }
    });

    const result: EmbedGroup[] = [];
    Object.entries(deptGroups).forEach(([dept, fb]) => {
      if (fb.length > 0) result.push({ department: dept, files: fb });
    });
    Object.entries(projGroups).forEach(([projId, fb]) => {
      if (fb.length > 0) result.push({ project_id: projId, files: fb });
    });

    onSubmit(result);
  };

  const hasUnassigned = unassignedFiles.length > 0;
  const hasAssigned = files.length > unassignedFiles.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0a1628] border border-white/10 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div>
            <h2 className="text-xl font-bold text-white">Assign Documents</h2>
            <p className="text-sm text-white/60 mt-1">
              Drag and drop documents to organize them into departments or projects before embedding.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content layout: 2 columns */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row min-h-[400px]">
          
          {/* Left Column: Unassigned Files */}
          <div className="w-full lg:w-1/3 flex flex-col border-r border-white/10 bg-white/[0.02]">
            <div className="p-4 border-b border-white/10 bg-white/5">
              <h3 className="font-semibold text-white flex items-center justify-between">
                <span>Unassigned Files</span>
                <span className="bg-white/10 text-white/80 text-xs py-0.5 px-2 rounded-full">
                  {unassignedFiles.length}
                </span>
              </h3>
            </div>
            
            <div 
              className={`flex-1 overflow-y-auto p-4 space-y-2 transition-colors duration-200 ${draggedFileId ? 'bg-[#5DD7AD]/5' : ''}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'unassigned')}
            >
              {unassignedFiles.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/30 space-y-3 px-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <p className="text-sm">All files assigned!</p>
                </div>
              ) : (
                unassignedFiles.map(file => (
                  <div
                    key={file.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, file.id)}
                    onDragEnd={handleDragEnd}
                    className="group bg-white/5 border border-white/10 hover:border-[#5DD7AD]/50 rounded-lg p-3 flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all hover:bg-white/10"
                  >
                    <GripVertical className="w-4 h-4 text-white/30 group-hover:text-white/60" />
                    <FileText className="w-4 h-4 text-[#5DD7AD]" />
                    <span className="text-sm text-white/90 truncate flex-1" title={file.name}>
                      {file.name}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Drop Targets */}
          <div className="w-full lg:w-2/3 flex flex-col bg-[#0a1628]">
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Departments */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white/80 pb-2 border-b border-white/10">
                  <Building2 className="w-5 h-5 text-[#5DD7AD]" />
                  <h3 className="font-semibold text-white">Departments</h3>
                </div>
                <div className="space-y-3">
                  {departments.map(dept => {
                    const targetId = `dept-${dept.name.toLowerCase()}`;
                    const assignedList = getAssignedFiles(targetId);
                    
                    return (
                      <div 
                        key={targetId}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, targetId)}
                        className={`border rounded-xl p-4 transition-all duration-200 
                          ${draggedFileId ? 'border-[#5DD7AD]/30 bg-[#5DD7AD]/5' : 'border-white/10 bg-white/5'}
                        `}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white/90 capitalize">{dept.name}</h4>
                          <span className="text-xs text-white/50 bg-white/10 px-2 py-0.5 rounded-full">{assignedList.length} files</span>
                        </div>
                        <div className="space-y-1.5 min-h-[40px] rounded-lg p-1">
                          {assignedList.length === 0 ? (
                            <div className="h-full flex items-center justify-center">
                              <span className="text-xs text-white/30">Drop files here</span>
                            </div>
                          ) : (
                            assignedList.map(f => (
                              <div
                                key={f.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, f.id)}
                                onDragEnd={handleDragEnd}
                                className="bg-[#0a1628] border border-white/10 rounded px-2 py-1.5 flex items-center gap-2 cursor-grab active:cursor-grabbing text-xs text-white/80 hover:bg-white/5"
                              >
                                <GripVertical className="w-3 h-3 text-white/30" />
                                <span className="truncate" title={f.name}>{f.name}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white/80 pb-2 border-b border-white/10">
                  <FolderKanban className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-semibold text-white">Projects</h3>
                </div>
                <div className="space-y-3">
                  {projects.map(proj => {
                    const targetId = `proj-${proj.id}`;
                    const assignedList = getAssignedFiles(targetId);
                    
                    return (
                      <div 
                        key={targetId}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, targetId)}
                        className={`border rounded-xl p-4 transition-all duration-200 
                          ${draggedFileId ? 'border-indigo-500/30 bg-indigo-500/5' : 'border-white/10 bg-white/5'}
                        `}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white/90 truncate pr-2" title={proj.name}>{proj.name}</h4>
                          <span className="text-xs text-white/50 bg-white/10 px-2 py-0.5 rounded-full shrink-0">{assignedList.length} files</span>
                        </div>
                        <div className="space-y-1.5 min-h-[40px] rounded-lg p-1">
                          {assignedList.length === 0 ? (
                            <div className="h-full flex items-center justify-center">
                              <span className="text-xs text-white/30">Drop files here</span>
                            </div>
                          ) : (
                            assignedList.map(f => (
                              <div
                                key={f.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, f.id)}
                                onDragEnd={handleDragEnd}
                                className="bg-[#0a1628] border border-white/10 rounded px-2 py-1.5 flex items-center gap-2 cursor-grab active:cursor-grabbing text-xs text-white/80 hover:bg-white/5"
                              >
                                <GripVertical className="w-3 h-3 text-white/30" />
                                <span className="truncate" title={f.name}>{f.name}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasUnassigned && (
              <div className="flex items-center gap-1.5 text-amber-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Unassigned files will be ignored</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isSubmitting || !hasAssigned}
              className="px-6 py-2 bg-gradient-to-r from-[#5DD7AD] to-[#3ab88e] hover:from-[#4cc69c] hover:to-[#2aa77d] text-[#0a1628] font-medium rounded-lg shadow-lg shadow-[#5DD7AD]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0a1628] border-t-transparent rounded-full animate-spin" />
                  Embedding...
                </>
              ) : (
                'Confirm Embed'
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
