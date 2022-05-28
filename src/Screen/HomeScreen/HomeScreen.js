import {
  FlexColumn,
  InnerSection,
  SpinnerContainer,
} from "../../Global.Styles";
import {
  CardsContainer,
  Description,
  HeroSection,
  InnerHeroSection,
  LoadMore,
  MoviesTitle,
  Title,
} from "./HomeScreen.Styles";
import Card from "../../Components/Card/Card";
import { useEffect, useState, useCallback } from "react";
import CRUDRequest from "../../API";
function HomeScreen(props) {
  const [movesList, setMovesList] = useState([]);
  const [isLodaing, setIsLodaing] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const fetchData = useCallback(async () => {
    const response = await CRUDRequest.get(
      `movie/popular?api_key=7b275ef8c426a1457421f07013981104&page=${pageNumber}`
    );
    setMovesList((prevState) => [...prevState, ...response.data.results]);
    setIsLodaing(false);
  }, [pageNumber]);
  const handelLoade = () => {
    setPageNumber((prevState) => prevState + 1);
  };
  useEffect(() => {
    fetchData();
  }, [fetchData, pageNumber]);
  return isLodaing ? (
    <SpinnerContainer />
  ) : (
    <FlexColumn>
      <HeroSection
        img={"https://image.tmdb.org/t/p/w500" + movesList[0].backdrop_path}
      >
        <InnerHeroSection>
          <Title style={{  color: "#fff"}}>{movesList[0].title}</Title>
          <Description>{movesList[0].overview}</Description>
        </InnerHeroSection>
      </HeroSection>
      <InnerSection>
        <MoviesTitle>Popular Movies</MoviesTitle>
        <CardsContainer>
          {movesList.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.title}
              img={"https://image.tmdb.org/t/p/w500" + item.poster_path}
            />
          ))}
        </CardsContainer>
        <LoadMore onClick={handelLoade} isLoading={isLodaing}>
          Load more...
        </LoadMore>
      </InnerSection>
    </FlexColumn>
  );
}

export default HomeScreen;
