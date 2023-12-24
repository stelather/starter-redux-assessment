import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSuggestion,
  selectError,
  selectLoading,
  selectSuggestion
  // Task 18: Import the `selectSuggestion()` selector from the suggestion slice
} from './suggestion.slice';
import './suggestion.css';

export default function Suggestion() {
  // Task 19: Call useSelector() with the selectSuggestion() selector
  // The component needs to access the `imageUrl` and `caption` properties of the suggestion object.
  const suggestion = useSelector(selectSuggestion);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadSuggestion() {
      // Task 20: Dispatch the fetchSuggestion() action creator
      try{
        dispatch(fetchSuggestion());
      }
      catch (error) {
        // Handle any potential error here
        throw error;
        //console.log(error.message);
      }
    }
    loadSuggestion();
  }, [dispatch]);


  let render;
  if (loading) {
    console.log('loading',loading);
    render = <h3>Loading...</h3>;
  } else if (error) {
    console.log('error',error);
    render = <h3>Sorry, we're having touble loading the suggestion.</h3>;
  } else {
    // [done] Task 21: Enable the two JSX lines below needed to display the suggestion on the page
    const { caption, imageUrl } = suggestion.data;

    render = (
        <>
          <img alt={caption} src={imageUrl} />
          <p>{caption}</p>
        </>
    );
  }

  return (
      <section className="suggestion-container">
        <h2>Suggestion of the Day</h2>
        {render}
      </section>
  );
}