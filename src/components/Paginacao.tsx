
 const MAX_ITEMS = 9;
 const MAX_LEFT = (MAX_ITEMS - 1) / 2;


export default function Paginacao({ limit, total, paginaAtual, setPagina }: any) {
 
  const current = paginaAtual;
  const pages = Math.ceil(total / limit);
  const maxFirst = Math.max(pages - (MAX_ITEMS - 1), 1);
  const first = Math.min(
    Math.max(current - MAX_LEFT, 1),
    maxFirst
  );

  function onPageChange(page: any) {
    setPagina(page);
  }

  return (
    <>
      {(total > limit) ? (
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center mt-4 mb-4">

            {current !== 1 && (
              <li className="page-item">
                <button className="page-link" aria-label="Previous"
                  onClick={() => onPageChange(current - 1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
            )}

            {Array.from({ length: Math.min(MAX_ITEMS, pages) })
              .map((_, index) => index + first)
              .map((page) => (
                <li key={page} className="page-item">
                  <button className={page === current ? "page-link active" : "page-link"}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}

            {current !== pages && (
              <li className="page-item">
                <button className="page-link" aria-label="Next"
                  onClick={() => onPageChange(current + 1)}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            )}

          </ul>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
}