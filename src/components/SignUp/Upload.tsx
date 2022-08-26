import classNames from 'classnames';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import './upload.scss';


export const Upload: FC = () => {
  const { watch, register, formState } = useFormContext();
  const selectedFile: FileList = watch('photo');
  const { errors } = formState;

  return (
    <div className="upload">
      <label className="upload__label">
        <span className={
          classNames(
            'upload__btn',
            {'upload__btn-error': errors.photo}
          )
        }>
          Upload
        </span>
        <input
          className="upload__input"
          type="file"
          {...register("photo")}
        />

        <div className={
          classNames(
            'upload__filename-wrapper',
            {'upload__filename-wrapper-error': errors.photo}
          )}
        >
          <span className="upload__filename ellipsis">
            {
              selectedFile && selectedFile.item(0)
                ? (selectedFile.item(0)?.name)
                : ('Upload your photo')
            }
          </span>
        </div>
        <p className='signup__error'>
          {errors.photo?.message as string}
        </p>
      </label>

    </div>
  );
};