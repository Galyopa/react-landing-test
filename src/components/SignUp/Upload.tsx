import { FC, useState } from 'react';
import './upload.scss';

export const Upload: FC = () => {
  const [
    selectedFile,
    setSelectedFile
  ] = useState<FileList | undefined>(undefined);

  return (
    <div className="upload">
      <label className="upload__label">
        <span className="upload__btn">
          Upload
        </span>
        <input
          className="upload__input"
          type="file"
          name="photo"
          onChange={
            event => {
              if (event.target.files) {
                setSelectedFile(event.target.files);
              }
            }
          }
        />

        <div className="upload__filename-wrapper">
          <span className="upload__filename ellipsis">
            {
              selectedFile?.item(0)
                ? (selectedFile.item(0)?.name)
                : ('Upload your photo')
            }
          </span>
        </div>
      </label>
    </div>
  );
};