import { Alert, Avatar, Box, Button, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import Item from "../components/Item";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchUser } from "../libs/fetcher";
import FollowButton from "../components/FollowButton";

export default function Profile() {
  const { id } = useParams();
  const { isLoading, isError, error, data } = useQuery(`users/${id}`, async () => fetchUser(id));

  if (isError) {
    return (
      <Box>
        <Alert severity="warning">{error.message}</Alert>
      </Box>
    );
  }
  if (isLoading) {
    return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
  }

  console.log(data);

  return (
    <Box>
      <Box sx={{ bgcolor: "banner", height: 150, borderRadius: 4 }}></Box>
      <Box
        sx={{
          mb: 4,
          marginTop: "-60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar sx={{ width: 100, height: 100, bgcolor: pink[500] }} />
        <Box sx={{ textAlign: "center" }}>
          <Typography>{data?.name}</Typography>
          <Typography sx={{ fontSize: "0.8em", color: "text.fade" }}>{data?.bio}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 1 }}>
          <Typography sx={{ fontSize: "0.8em", color: "text.fade" }}>{data?.posts.length} posts</Typography>
          <Typography sx={{ fontSize: "0.8em", color: "text.fade" }}>{data?.followers.length} followers</Typography>
          <Typography sx={{ fontSize: "0.8em", color: "text.fade" }}>{data?.following.length} following</Typography>
        </Box>
        <FollowButton user={data} />
      </Box>
      {data.posts &&
        data.posts.map((post) => {
          return <Item key={post.id} remove={() => {}} item={post} />;
        })}
      {data.posts.length <= 0 && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h5">No posts yet</Typography>
        </Box>
      )}
    </Box>
  );
}
