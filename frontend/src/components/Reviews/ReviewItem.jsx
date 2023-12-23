const ReviewItem = ({ item }) => {
  const { review, user } = item;
  const { text, createdAt, raiting } = review;

  const options = { year: "numeric", month: "long", day: "numeric" };

  const formattedDate = new Date(createdAt).toLocaleDateString("tr-TR", options);

  return (
    <li className="comment-item">
      <div className="comment-avatar">
        <img src={user.avatar} alt="" width={60} />
      </div>
      <div className="comment-text">
        <ul className="comment-star">
          {Array.from({ length: raiting }, (_, index) => {
            return (
              <li key={index}>
                <i className="bi bi-star-fill"></i>
              </li>
            );
          })}
        </ul>
        <div className="comment-meta">
          <strong>{user.username}</strong>
          <span> - </span>
          <time>{formattedDate}</time>
        </div>
        <div className="comment-description">
          <p>{text}</p>
        </div>
      </div>
    </li>
  );
};

export default ReviewItem;
