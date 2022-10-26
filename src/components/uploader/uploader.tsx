import React, { useEffect } from "react";
import { readFile } from "../../util/read-file";
import { IUploadedFile } from "./uploader.types";

/**
 * @component
 * @description image uploader component
 * @param {string?} label the label of the uploader
 * @param {boolean?} multiple if true, the user will be able to upload multiple files
 * @param {(files) => any} onUpload triggers when user upload a number of images
 */
const FileUploader = ({
  multiple = false,
  onUpload,
  open,
}: {
  multiple?: boolean;
  onUpload: (files: IUploadedFile[]) => any;
  open: number;
}) => {
  const fileInput = React.useRef<any>(null);

  const handleFiles = async (e: any) => {
    let files: any[] = [];

    for (let i = 0; i < e.target.files.length; i++) {
      const fileContent = await readFile({
        file: e.target.files[i],
        readMethod: "text",
      });

      files.push({
        file: e.target.files[i],
        content: fileContent,
      });
    }

    onUpload(files);
  };

  useEffect(() => {
    if (!!open) fileInput.current?.click();
  }, [open]);

  return (
    <input
      ref={fileInput}
      type="file"
      style={{ display: "none" }}
      multiple={multiple === true}
      accept="text/plain"
      onChange={handleFiles}
    />
  );
};

export default FileUploader;
