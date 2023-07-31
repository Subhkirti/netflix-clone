import React, { useEffect } from "react";
import { fetchWatchList } from "@/app/services/movieService";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "@/app/actions/userAction";
import { getLocalUser } from "@/app/services/authService";
import Loader from "@/app/loader";
import Image from "next/image";

function MyList() {
  const user = useSelector((state) => state.user) || getLocalUser();
  const dispatch = useDispatch();

  console.log("user:", user);

  useEffect(() => {
    async function getWatchList() {
      const res = await fetchWatchList({ emailOrMobile: user?.emailOrMobile });
      res.data && dispatch(setCurrentUser({ ...res.data }));
    }
    getWatchList();
  }, []);
  return (
    <div>
      MYLIST

      {user?.watchList?.length > 0 ? (
        user?.watchList.map((item) => {
          return (
            <div>
              <Image
                src={`https://image.tmdb.org/t/p/w500${
                  item.backdrop_path || item.poster_path
                }`}
                alt=""
                width={200}
                height={200}
              ></Image>
            </div>
          );
        })
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default MyList;
