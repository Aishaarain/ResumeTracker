

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatSize } from '../../lib/utils';

const FileUploader = ({ onFileSelect }) => {
  const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0] || null;
      if (onFileSelect) onFileSelect(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: maxFileSize,
  });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full bg-gradient-to-b from-light-blue-100 to-light-blue-200 p-4 rounded-2xl;">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className="space-y-4 cursor-pointer">
          {file ? (
            <div
              className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl;"
              onClick={(e) => e.stopPropagation()}
            >
              <img src="/images/pdf.png" alt="pdf" className="size-10" />
              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
                </div>
              </div>
              <button
                className="p-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onFileSelect) onFileSelect(null);
                }}
              >
                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className='text-center'>
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                <img src="/icons/info.svg" alt="upload" className="size-20" />
              </div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-lg text-gray-500">PDF (max {formatSize(maxFileSize)})</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
