import axios from "axios";

export const GetRequest = async (pageNo) => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/trending/movie/day",
    params: { language: "en-US", page: pageNo },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjUzMDQ0YjVjMDY0Njg2ZDA2YzY2ZDNkMWMwYzFlOCIsInN1YiI6IjY2MDU5ZGY0ZjkwYjE5MDE2M2E4MWU0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fXn7HCPO9Ns1uH_6VM0nHOfBAw1XzqCOGLedRp2zhfw",
    },
  };
  const response = await axios.request(options);
  console.log(response);
  // return response?.data?.results;
  return response?.data;
};
