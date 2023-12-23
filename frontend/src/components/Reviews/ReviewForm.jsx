import { message } from "antd";
import { useState } from "react";

const ReviewForm = ({ singleProduct, setSingleProduct }) => {
  const [raiting, setRaiting] = useState(0);
  const [review, setReview] = useState("");

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // console.log(user);
  const handleChangeRaiting = (e, newRaiting) => {
    e.preventDefault();
    setRaiting(newRaiting);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      reviews: [
        ...singleProduct.reviews,
        {
          text: review,
          raiting: parseInt(raiting),
          user: user.id || user._id,
        },
      ],
    };

    try {
      const res = await fetch(`${apiUrl}/api/products/${singleProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        message.error("bir şeyler yanlış gitti");
        return;
      }
      const data = await res.json();
      setReview("");
      setRaiting(0);
      message.success("yorum başarıyle eklendi.");
      setSingleProduct(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <p className="comment-notes">
        Your email address will not be published. Required fields are marked
        <span className="required">*</span>
      </p>
      <div className="comment-form-rating">
        <label>
          Your rating
          <span className="required">*</span>
        </label>
        <div className="stars">
          <a
            onClick={(e) => handleChangeRaiting(e, 1)}
            href=""
            className={`star ${raiting == 1 && "active"}`}>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            onClick={(e) => handleChangeRaiting(e, 2)}
            href="#"
            className={`star ${raiting == 2 && "active"}`}>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            onClick={(e) => handleChangeRaiting(e, 3)}
            href="#"
            className={`star ${raiting == 3 && "active"}`}>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            onClick={(e) => handleChangeRaiting(e, 4)}
            href="#"
            className={`star ${raiting == 4 && "active"}`}>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            onClick={(e) => handleChangeRaiting(e, 5)}
            href="#"
            className={`star ${raiting == 5 && "active"}`}>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
        </div>
      </div>
      <div className="comment-form-comment form-comment">
        <label htmlFor="comment">
          Your review
          <span className="required">*</span>
        </label>
        <textarea
          value={review}
          id="comment"
          cols="50"
          rows="10"
          onChange={(e) => setReview(e.target.value)}></textarea>
      </div>
      <div className="comment-form-cookies">
        <input id="cookies" type="checkbox" />
        <label htmlFor="cookies">
          Save my name, email, and website in this browser for the next time I comment.
          <span className="required">*</span>
        </label>
      </div>
      <div className="form-submit">
        <input type="submit" className="btn submit" />
      </div>
    </form>
  );
};

export default ReviewForm;
