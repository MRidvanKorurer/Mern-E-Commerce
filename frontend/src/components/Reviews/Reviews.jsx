import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import "./Reviews.css";
import { message } from "antd";

const Reviews = ({ active, singleProduct, setSingleProduct }) => {
const [users, setUsers] = useState([]);

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const thisReview = [];


useEffect(() => {
  const allUsers = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/users`);
      if(res.ok) {
        const data = await res.json()
        setUsers(data.user);
      }else{
        message.error("veri getirme başarısız!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  allUsers();
}, [apiUrl])



singleProduct.reviews.forEach((review) => {
  const matchingUsers = users?.filter((user) => user._id === review.user);

  matchingUsers.forEach((matchingUser) => {
    thisReview.push(({
      review: review,
      user: matchingUser,
    }))
  })
});



  return (
    <div className={`tab-panel-reviews ${active}`}>
      {singleProduct.reviews.length > 0 ? (
        <>
          <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
          <div className="comments">
            <ol className="comment-list">
              {thisReview.map((item, index) => {
                return <ReviewItem  key={index} item={item} />;
              })}
            </ol>
          </div>{" "}
        </>
      ) : (
        <h3>Hiç yorum yok...</h3>
      )}

      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm setSingleProduct={setSingleProduct} singleProduct={singleProduct}/>
      </div>
    </div>
  );
};

export default Reviews;
