import { FlexColumn, FlexRow, InnerSection } from "../../Global.Styles";
import {
  CardsContainer,
  HeroSection,
  InnerHeroSection,
  MoviesTitle,
} from "../HomeScreen/HomeScreen.Styles";
import {
  InfoText,
  MovieDetailsBox,
  MovieImage,
  MovieInfoBox,
  NavigatorContainer,
  NavigatorInnerContainer,
  NavigatorSpan,
  ProgressBar,
  ProgressBarContainer,
  ProgressBarPercentage,
} from "./MovieScreen.Styles";
import ActorCard from "../../Components/ActorCard/ActorCard";
import { useLocation, useParams } from "react-router";
import useSearchQuery from "../../Utils/querySearch";
import { useEffect, useState, useCallback } from "react";
import CRUDRequest from "../../API";
import { SpinnerContainer } from "../../Global.Styles";
import { Navigate } from "react-router-dom";
function MovieScreen() {
  const params = useParams();
  const location = useLocation();
  const query = useSearchQuery(location.search);
  const [moves, setMoves] = useState([]);
  const [isLodaing, setIsLodaing] = useState(true);
  const fetchData = useCallback(async () => {
    const response = await CRUDRequest.get(
      `movie/${params.id}?api_key=7b275ef8c426a1457421f07013981104`
    );
    setMoves((prevState) => response.data);
    setIsLodaing(false);
  }, [params.id]);
  console.log(moves);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return isLodaing ? (
    <SpinnerContainer />
  ) : (
    <FlexColumn>
      <NavigatorContainer>
        <NavigatorInnerContainer>
          <NavigatorSpan >Back </NavigatorSpan>
          <NavigatorSpan>/{moves.title}</NavigatorSpan>
        </NavigatorInnerContainer>
      </NavigatorContainer>
      <HeroSection
        img={"https://image.tmdb.org/t/p/w500" + moves.backdrop_path}
      >
        <InnerHeroSection>
          <MovieInfoBox>
            <MovieImage
              src={"https://image.tmdb.org/t/p/w500" + moves.poster_path}
              alt={moves.title}
            />
            <MovieDetailsBox>
              <InfoText margin={"0 0 25px"} fontSize={30} fontWeight={700}>
                {moves.original_title}
              </InfoText>
              <InfoText margin={"0 0 20px"} fontSize={16} fontWeight={700}>
                {moves.title}
              </InfoText>
              <InfoText margin={"0 0 20px"} fontSize={16} fontWeight={500}>
                {moves.overview}
              </InfoText>
              <InfoText margin={"0 0 20px"} fontSize={16} fontWeight={700}>
                IMDB RATING
              </InfoText>
              <ProgressBarContainer>
                <ProgressBar>
                  <ProgressBarPercentage width={moves.vote_average * 10} />
                </ProgressBar>
                <InfoText margin={"0 20px"} fontSize={16} fontWeight={500}>
                  {moves.vote_average}
                </InfoText>
              </ProgressBarContainer>{" "}
              <InfoText margin={"0 0 20px"} fontSize={16} fontWeight={700}>
                Tags
              </InfoText>
              <FlexRow>
                {moves.genres.map((item) => {
                  return (
                    <InfoText
                      key={item.id}
                      margin={"0 0 20px"}
                      fontSize={16}
                      fontWeight={500}
                    >
                      {item.name}
                    </InfoText>
                  );
                })}
              </FlexRow>
            </MovieDetailsBox>
          </MovieInfoBox>
        </InnerHeroSection>
      </HeroSection>
      <InnerSection>
        <MoviesTitle>production_companies</MoviesTitle>
        <CardsContainer>
          {moves.production_companies.map((item) => {
            return (
              <ActorCard
                key={item.id}
                id={item.id}
                name={item.name}
                img={"https://image.tmdb.org/t/p/w500" + item.logo_path}
              />
            );
          })}
        </CardsContainer>
      </InnerSection>
    </FlexColumn>
  );
}

export default MovieScreen;
