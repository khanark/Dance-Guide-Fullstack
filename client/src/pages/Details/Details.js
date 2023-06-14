import './Details.css'

import { danceTypeFormat, formatDate } from '../../util/util'
import { useEffect, useRef, useState } from 'react'

import AddFeedbackModal from '../../components/Modal/FeedbackModals/AddFeedback'
import { AdvancedImage } from '@cloudinary/react'
import EditSchoolModal from '../../components/Modal/SchoolModals/EditSchoolModal'
import Feedback from './components/Feedback'
import { Link } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'
import { matchLink } from '../../util/util'
import schoolsFactory from '../../services/schools'
import { useCloudinaryImage } from '../../hooks/useCloudinaryImage'
import { useParams } from 'react-router-dom'
import { useSingleSchoolReducer } from '../../hooks/useSchoolReducer'
import { useUserContext } from '../../contexts/AuthContext'

const Details = () => {
  const { schoolId } = useParams()
  const [{ schoolDetails: school, isLiked }, schoolActions] =
    useSingleSchoolReducer()
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useUserContext()
  const { singleSchool } = schoolsFactory(user)
  const [isUserOwnSchool, setIsUserOwnschool] = useState(false)
  const feedbackListRef = useRef()

  useEffect(() => {
    singleSchool(schoolId)
      .then((school) => {
        const isLiked = school?.likes?.users?.includes(user?._id)
        setIsUserOwnschool(school?.owner?._id === user?._id)
        schoolActions.setSingleSchool(school, isLiked)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const onLikeSubmit = async () => {
    schoolActions.setLiked(true)
    await schoolsFactory(user).likeSchool(schoolId)
  }

  const onUnlikeSubmit = async () => {
    schoolActions.setLiked(false)
    await schoolsFactory(user).unLikeSchool(schoolId)
  }

  const schoolImage = useCloudinaryImage(school?.image)
  console.log(school)

  return (
    <div className="details-page container-secondary">
      <section
        className="school-details section  grid grid--cols-2"
        style={{ minHeight: '45rem' }}
      >
        {isLoading ? (
          <>
            <Spinner className="loading" style={{}} />
          </>
        ) : (
          <>
            <div
              className={`school-image--wrapper ${
                !schoolImage && 'loadingImage'
              }`}
            >
              <AdvancedImage cldImg={schoolImage} className="school-image" />
            </div>
            <div className="school-details--wrapper">
              <div className="school-heading">
                <h3 className="school-name">
                  {school?.name}{' '}
                  {school?.feedbacks.length && (
                    <span
                      className="school-reviews"
                      onClick={() =>
                        feedbackListRef.current.scrollIntoView({
                          behavior: 'smooth',
                        })
                      }
                    >
                      {school?.feedbacks.length} reviews
                    </span>
                  )}
                </h3>
                {user && isUserOwnSchool && (
                  <div className="school-user__action">
                    <EditSchoolModal />
                  </div>
                )}
              </div>
              <h5 className="school-general-info">
                Publicated on {formatDate(school?.createdAt)} from{' '}
                <Link
                  to={`/user/profile/${school?.owner?._id}`}
                  className="school-owner--link"
                >
                  {school?.owner?.firstName} {school?.owner?.lastName}
                </Link>
              </h5>
              <h5 className="school-location">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="school-location--icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>
                  {school?.settlement}, {school?.street}
                </span>
              </h5>
              <p className="school-type text_small">
                {danceTypeFormat(school?.schoolType)}
              </p>
              <section className="school-contacts">
                <h5 className="school-subtitle">Contacts</h5>
                <ul className="school-contact-list">
                  <li>
                    <span className="link-span">
                      {school?.owner?.phoneNumber}
                    </span>
                  </li>
                  <li>
                    <span className="link-span">{school?.owner?.email}</span>
                  </li>
                  <li>
                    <Link to={school?.link} target="_blank">
                      <span className="link-span">
                        {matchLink(school?.link)}
                      </span>
                    </Link>
                  </li>
                </ul>
              </section>
              <section className="school-about">
                <h5 className="school-subtitle">About us</h5>
                <p className="">{school?.description}</p>
              </section>
              {user && !isUserOwnSchool && (
                <div className="btn--wrapper">
                  <button
                    className={`btn btn-like ${isLiked && 'liked'}`}
                    onClick={() => {
                      if (isLiked) {
                        onUnlikeSubmit()
                      } else {
                        onLikeSubmit()
                      }
                    }}
                  >
                    {isLiked && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        class="liked-icon"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    )}

                    {isLiked ? 'Liked' : 'Like'}
                  </button>
                </div>
              )}
            </div>
            <div id="school-feedbacks"></div>
          </>
        )}
      </section>
      {!isLoading && (
        <section className="school-feedbacks section">
          <ul className="feedback-list" ref={feedbackListRef}>
            {school?.feedbacks?.map((feedback) => (
              <Feedback key={feedback._id} feedback={feedback} />
            ))}
          </ul>
          {user && !isUserOwnSchool && (
            <div className="feedback-post">
              <p>Want to write a review?</p>
              <AddFeedbackModal
                schoolId={schoolId}
                addFeedbackToState={schoolActions.addFeedback}
              />
            </div>
          )}
        </section>
      )}
    </div>
  )
}

export default Details
