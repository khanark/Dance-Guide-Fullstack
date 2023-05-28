import './Details.css';

import { danceTypeFormat, formatDate } from '../../util/util';
import { useEffect, useState } from 'react';

import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { matchLink } from '../../util/util';
import schoolsFactory from '../../services/schools';
import { useCloudinaryImage } from '../../hooks/useCloudinaryImage';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../contexts/AuthContext';

const Details = () => {
  const { schoolId } = useParams();
  const [school, setSchool] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserContext();
  const { singleSchool } = schoolsFactory(user);

  useEffect(() => {
    singleSchool(schoolId)
      .then(school => {
        setSchool(school);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const schoolImage = useCloudinaryImage(school?.image);
  return (
    <div className="details-page section">
      <div
        className="school-details container-secondary grid grid--cols-2"
        style={{ minHeight: '45rem' }}
      >
        {isLoading ? (
          <>
            <Spinner className="loading" style={{}} />
          </>
        ) : (
          <>
            <div className={`school-image--wrapper ${!schoolImage && 'loadingImage'}`}>
              <AdvancedImage cldImg={schoolImage} className="school-image" />
            </div>
            <div className="school-details--wrapper">
              <h4 className="school-name">{school?.name}</h4>
              <h5>
                Publicated on {formatDate(school?.createdAt)} from (
                <Link to={`/user/profile/${school?.owner?._id}`} className="school-owner--link">
                  {school?.owner?.firstName} {school?.owner?.lastName}
                </Link>
                )
              </h5>
              <p className="school-type text_small">{danceTypeFormat(school?.schoolType)}</p>
              <section className="school-contacts">
                <h5 className="school-subtitle">Contacts</h5>
                <ul className="school-contact-list">
                  <li>
                    <Link>
                      <span className="link-span">{school?.owner?.phoneNumber}</span>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <span className="link-span">{school?.owner?.email}</span>
                    </Link>
                  </li>
                  <li>
                    <Link>
                      <span className="link-span">{matchLink(school?.link)}</span>
                    </Link>
                  </li>
                </ul>
              </section>
              <section className="school-about">
                <h5 className="school-subtitle">About us</h5>
                <p className="">{school?.description}</p>
              </section>
              <div className="btn--wrapper">
                <button className="btn">Like</button>
                <button className="btn">Add Feedback</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Details;
