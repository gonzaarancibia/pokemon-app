import './PaginationSkeleton.scss';

export default function PaginationSkeleton() {
  return (
    <div className="pagination-skeleton">
      <div className="pagination-skeleton__button"></div>

      <div className="pagination-skeleton__pages">
        <div className="pagination-skeleton__page"></div>
        <div className="pagination-skeleton__page"></div>
        <div className="pagination-skeleton__page pagination-skeleton__page--active"></div>
        <div className="pagination-skeleton__page"></div>
        <div className="pagination-skeleton__page"></div>
      </div>

      <div className="pagination-skeleton__button"></div>

      <div className="pagination-skeleton__info"></div>
    </div>
  );
}
