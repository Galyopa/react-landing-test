import classNames from "classnames";
import { FC, useCallback, useEffect, useState } from "react";
import { useListUsersQuery, usePrefetch } from "../../services/UsersApi";
import { User } from "../../types/User";
import { Loader } from "../Loader/Loader";
import userIcon from '../../images/photo-cover.svg';
import './users.scss';

export const Users: FC = () => {
  const [page, setPage ] = useState(1);
  const [users, setUsers] = useState<User []>([]);
  const [totalPages, setTotalPages] = useState(1);
  const { data, isLoading, isFetching} = useListUsersQuery(page);
  const prefetchPage = usePrefetch('listUsers');

  const prefetchNext = useCallback(() => {
    prefetchPage(page + 1);
  }, [prefetchPage, page]);

  useEffect(() => {
    if (data) {
      setUsers([...users, ...data.users]);
      setTotalPages(data.total_pages);

      if (page !== data.total_pages) {
        prefetchNext();
      }
    }
  }, [data]);


  return (
    <section className="users section" id="users">
      <div className="container">
        <h2 className="users__title title">
        Working with GET request
        </h2>
        <ul className="users__list">
          {
            users.map(user => (
              <li className="users__item" key={user.id}>
                <img
                  className="users__img"
                  src={
                    user.photo.includes('users')
                      ? user.photo
                      : userIcon
                  }
                  alt={user.name}
                />
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

        {isLoading || isFetching && <Loader />}

        <button
          disabled={page >= totalPages}
          className={
            classNames(
              'users__link',
              'lnk',
              {'lnk-disable': page >= totalPages}
            )
          }
          onClick={() => setPage(page + 1)}
        >
          Show more
        </button>
      </div>
    </section>
  );
};
