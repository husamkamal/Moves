import { CardContainer, CardImg } from "./Card.Styles";

function Card({ id, img, name }) {
  return (
    <CardContainer to={`/moves/${id}`}>
      <CardImg src={img} alt={name} />
    </CardContainer>
  );
}

export default Card;
