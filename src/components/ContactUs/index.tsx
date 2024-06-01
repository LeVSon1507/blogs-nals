/* eslint-disable react/self-closing-comp */
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import contactusSVG from 'src/assets/images/contact_us.svg';
import './styles.css';
import { ToastInfo } from 'src/utils/toastOptions';
import { RE_CAPTCHA_SITE_KEY } from 'src/utils/helper';

const ContactUs = () => {
  const [isShowBtnSend, setIsShowBtnSend] = useState(true);
  const [questionAbout, setQuestionAbout] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    ToastInfo('Chức năng này đang trong quá trình phát triển, xin lỗi vì sự bất tiện này!');
  };

  const onSuccessReCaptcha = () => {
    setIsShowBtnSend(true);
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="d-flex vh-100 contactUs-container">
      <div className="row align-items-center justify-content-center">
        <div className="col-12 col-md-5">
          <img src={contactusSVG} height={300} alt="contact_us_SVG" className="img-fluid" />
        </div>
        <div className="col-12 col-md-4">
          <div>
            <p className="lead">Xin Chào!</p>
            <h4>Cảm ơn bạn đã liên hệ với tôi! Chúng tôi mong chờ tin từ bạn!</h4>
            <form>
              <div className="form-group">
                <label htmlFor="questionAbout">Tôi gặp vấn đề về</label>
                <select
                  className="form-control"
                  id="questionAbout"
                  value={questionAbout}
                  onChange={(e) => setQuestionAbout(e.target.value)}
                >
                  <option value="Tạo tin tức mới">Tạo tin tức mới</option>
                  <option value="Tìm kiếm tin tức">Tìm kiếm tin tức</option>
                  <option value="Tìm kiếm tin tức theo từ khoá cụ thể">
                    Tìm kiếm tin tức theo từ khoá cụ thể
                  </option>
                  <option value="Các vấn đề khác (miêu tả cụ thể bên dưới)">
                    Các vấn đề khác (miêu tả cụ thể bên dưới)
                  </option>
                  <option value="Vấn đề bảo mật">Vấn đề bảo mật</option>
                  <option value="Vấn đề tài khoản">Vấn đề tài khoản</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  value={message}
                  onChange={handleChangeMessage}
                ></textarea>
              </div>
              <div className="form-group">
                <ReCAPTCHA sitekey={RE_CAPTCHA_SITE_KEY} onChange={onSuccessReCaptcha} />
              </div>
              {isShowBtnSend && (
                <div className="form-group mt-3">
                  <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
