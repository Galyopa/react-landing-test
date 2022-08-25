import classNames from "classnames";
import { FC, useCallback, useEffect, useState } from "react";
import { useListUsersQuery, usePrefetch } from "../../services/UsersApi";
import { User } from "../../types/User";
import { Loader } from "../Loader/Loader";
import './users.scss';

export const Users: FC = () => {
  const [page, setPage ] = useState(1);
  const [users, setUsers] = useState<User []>([]);
  const { data, isLoading, isFetching} = useListUsersQuery(page);
  const prefetchPage = usePrefetch('listUsers');

  const prefetchNext = useCallback(() => {
    prefetchPage(page + 1);
  }, [prefetchPage, page]);

  useEffect(() => {

    if (data) {
      setUsers([...users, ...data.users]);

      if (page !== data.total_pages) {
        prefetchNext();
      }
    }
  }, [data]);

  if (!data?.users) {
    return <div>No users :(</div>;
  }

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

        {isLoading || isFetching && <Loader />}

        <button
          disabled={page >= data.total_pages}
          className={
            classNames(
              'users__link',
              'lnk',
              {'lnk-disable': page >= data.total_pages}
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
