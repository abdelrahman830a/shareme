import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";
import MasonaryLayout from "./MasonaryLayout";

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  const ideaName = categoryId || "new";
  if (loading) {
    return (
      <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
    );
  }
  if (!pins?.length) {
    return (
      <h2 className="text-2xl text-center">
        No pins found for {categoryId} category
      </h2>
    );
  }
  return <div>{pins && <MasonaryLayout pins={pins} />}</div>;
};

export default Feed;