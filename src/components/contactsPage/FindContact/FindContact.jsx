import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Container } from './FindContact.styled';
import { actions } from 'redux/contacts';

export default function FindContact() {
  const value = useSelector(state => state.filter);
  const dispatch = useDispatch();

  return (
    <Container>
      <p>Find contacts by name</p>
      <input
        type="text"
        name="filter"
        value={value}
        onChange={({ target }) => dispatch(actions.changeFitler(target.value))}
      />
    </Container>
  );
}
