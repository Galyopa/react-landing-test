import { FC } from 'react';
import { useGetPositionsQuery } from '../../services/PositionsApi';
import './position.scss';

export const  Position: FC = () => {
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
              value={position.name}
              name="position"
              id={position.name}
              defaultChecked
            />
            {position.name}
          </label>
        ))}
    </div>
  );
};