import React, {  useState } from "react";
import ReactStars from "react-rating-stars-component";
import { format } from 'date-fns';

import { useNavigate, useParams } from "react-router-dom";
import UseAuth from "../Hook/UseAuth";
import Swal from "sweetalert2";

const AddReview = () => {
  const navigate = useNavigate()
  const { user } = UseAuth();
  const { id } = useParams();
  const formattedDate = new Date();
  const date = format(formattedDate, 'yyyy-MM-dd')

  const [rating, setRating] = useState(0);
  const handleInputChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value < 0) value = 0;
    if (value > 5) value = 5;
    setRating(value);
  };
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const submitReview = (e) => {
    e.preventDefault();
    const from = e.target;
    const textReview = from.textReview.value;
    const starReview = from.starReview.value;
    const Username = from.Username.value;
    const photoURL = from.photoURL.value;
    // console.log(textReview,starReview,date,Username,photoURL)
    const AddedReview = {
      feedBack_id: id,
      Reviewer_email: user.email,
      textReview,
      starReview,
      Username,
      photoURL,
      date
    };
    fetch("https://review-xpert-server-side.vercel.app/reviewAdd", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(AddedReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
            Swal.fire({
                icon: "success",
                title: "Review Added",
                text: "Your Review Added!",
              })
              navigate('/myReview')
        }
      });
  };

  return (
    <div>
      <div className="w-11/12 lg:w-6/12 mx-auto">
        <div className="flex flex-col justify-center items-center">
          <img className="w-10 h-10 rounded-full" src={user.photoURL} alt="" />
          <h2>{user.displayName}</h2>
        </div>

        <form onSubmit={submitReview} className="card-body">
          <div className="form-control">
            {/* text review */}
            <textarea
              name="textReview"
              required
              className="textarea textarea-bordered w-full"
              placeholder="Text Your FeedBack"
            ></textarea>
          </div>

          <div className="form-control">
            {/* rating section */}
            <label className="input input-bordered flex items-center gap-2">
              <ReactStars
                count={5}
                onChange={ratingChanged}
                value={rating}
                size={20}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
              (Clicked The Star )
              <input
                type="0"
                required
                name="starReview"
                className="grow"
                placeholder="Rating star"
                min="0"
                value={rating}
                max="5"
                step="1"
                onChange={handleInputChange}
              />
            </label>

            {/* review posted date */}
            <label className="input input-bordered flex items-center gap-2">
              Date
              <h2>{date}</h2>  
            </label>
            {/* user info  */}
            <label className=" input input-bordered flex items-center gap-2">
              User Name:
              <input
                name="Username"
                type="text"
                value={user.displayName}
                className="grow"
                placeholder="User Info"
              />
            </label>
            <label className=" input input-bordered flex items-center gap-2">
              User PhotoUrl:
              <input
                name="photoURL"
                type="text"
                value={user.photoURL}
                className="grow"
                placeholder="User Info"
              />
            </label>
          </div>
          <div className="w-2/12 mx-auto">
            <button className=" btn btn-active btn-neutral">Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
