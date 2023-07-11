import { useFilms } from "../../hooks/use.films";

export function PagingButtons() {
  const { handlePaging, next, previous } = useFilms();

  const handleLoadNext = () => {
    const url = next;
    if (!url) return;
    handlePaging(url);
  };

  const handleLoadPrevious = () => {
    const url = previous;
    if (!url) return;
    handlePaging(url);
  };

  return (
    <>
      <div>
        {previous ? (
          <button onClick={handleLoadPrevious}>&#60;</button>
        ) : (
          <button onClick={handleLoadPrevious} disabled>
            &#60;
          </button>
        )}
      </div>
      <div>
        {next ? (
          <button onClick={handleLoadNext}>&#62;</button>
        ) : (
          <button onClick={handleLoadNext} disabled>
            &#62;
          </button>
        )}
      </div>
    </>
  );
}
