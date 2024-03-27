import './index.css'
import {Link} from 'react-router-dom'

const SimilarProductItem = props => {
  const {productDetails} = props

  const {title, brand, imageUrl, rating, price, id} = productDetails
  //   const {id} = useParams()
  //   const {match} = props
  //   const {id} = match.params

  return (
    <Link to={`/products/${id}`} className="link-item">
      <li className="similar-product-item">
        <img
          src={imageUrl}
          className="similar-product-img"
          alt={`similar product ${title}`}
        />
        <p className="similar-product-title">{title}</p>
        <p className="similar-products-brand">by {brand}</p>
        <div className="similar-product-price-rating-container">
          <p className="similar-product-price">Rs {price}/-</p>
          <div className="similar-product-rating-container">
            <p className="similar-product-rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="similar-product-star"
            />
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarProductItem
