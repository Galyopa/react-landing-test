import { FC } from "react";
import { useGetUsersByPageQuery } from "../../services/UsersApi";
import './users.scss';

export const Users: FC = () => {
  const { data } = useGetUsersByPageQuery('1');
  const users = data?.users;

  return (
    <section className="users section" id="users">
      <div className="container">
        <h2 className="users__title title">
        Working with GET request
        </h2>
        <ul className="users__list">
          {
            users && users.map(user => (
              <li className="users__item" key={user.id}>
                <img className="users__img" src={user.photo} alt={user.name} />
                <h3 className="users__name ellipsis">
                  {user.name}
                </h3>
                <p className="users__position ellipsis">
                  {user.position}
                </p>
                <p className="users__email ellipsis">
                  {user.email}
                </p>
                <p className="users__phone ellipsis">
                  { user.phone }
                </p>
              </li>
            ))
          }

        </ul>
        <a className="users__link lnk" href="#">
        Show more
        </a>
      </div>
    </section>
  );
};
