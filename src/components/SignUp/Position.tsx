import { FC } from 'react';
import { useGetPositionsQuery } from '../../services/PositionsApi';
import './position.scss';

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
};

export const  Position: FC<Props> = ({onChange}) => {
  const { data } = useGetPositionsQuery();

  return (
    <div className="position">
      <h3 className='position__subtitle'>Select your position</h3>
      {
        data?.positions.map(position => (
          <label
            className="position__radio"
            htmlFor={position.name}
            key={position.id}>
            <input
              className="position__radio-btn"
              type="radio"
              value={position.id}
              name="position"
              id={position.name}
              onChange={onChange}
            />
            {position.name}
          </label>
        ))}
    </div>
  );
};