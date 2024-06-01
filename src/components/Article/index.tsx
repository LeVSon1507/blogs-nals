import './style.css';
import img from 'src/assets/images/content_blog.svg';
import { Blog } from 'src/redux/type';
import { isEmpty } from 'lodash';
import { LOGO_NALS, formatDateTime } from 'src/utils/helper';
import { useNavigate } from 'react-router-dom';

const Article = ({ data }: { data: Blog[] }) => {
  const navigate = useNavigate();

  const handleGoToDetailPage = (id: string) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <div className="container">
      <div className="row">
        {isEmpty(data) ? (
          <></>
        ) : (
          data.map((item: Blog, index: number) => {
            return (
              <div key={index} className="media col-lg-4 col-md-6 col-12 mt-4">
                <div className="cmp-article-item media-body card service-wrapper rounded border-0 shadow p-4">
                  <img src={item?.image} alt="hinh_anh_news" className="cmp-article-img" />
                  <div className="content mt-4">
                    <h5 className="title">{item?.title}</h5>
                    <p className="description media-content text-muted mt-3 mb-0">
                      {item?.description}
                    </p>
                    <p className="text-muted mt-3 mb-0">
                      Thông tin ngày: {formatDateTime(item?.createdAt)}
                    </p>
                    <div className="mt-3">
                      <button
                        onClick={() => handleGoToDetailPage(item?.id)}
                        className="btn btn-primary"
                      >
                        Xem Thêm <i className="mdi mdi-chevron-right" />
                      </button>
                    </div>
                  </div>
                  <div className="big-icon h1 text-custom">
                    <span className="uim-svg">
                      <img src={LOGO_NALS ?? img} alt="LOGO_NALS" width={200} height={200} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Article;
