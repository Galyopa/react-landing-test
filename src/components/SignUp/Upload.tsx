import { FC } from 'react';
import './upload.scss';

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  selectedFile: File | null
};

export const Upload: FC<Props> = ({ onChange, selectedFile }) => {

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
          onChange={onChange}
        />

        <div className="upload__filename-wrapper">
          <span className="upload__filename ellipsis">
            {
              selectedFile
                ? (selectedFile.name)
                : ('Upload your photo')
            }
          </span>
        </div>
      </label>
    </div>
  );
};