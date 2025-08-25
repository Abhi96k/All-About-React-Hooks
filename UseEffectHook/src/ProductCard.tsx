interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>
      );
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <span key={i} className="star empty">
          ☆
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.thumbnail} alt={product.title} />
        <div className="discount-badge">
          -{product.discountPercentage.toFixed(0)}%
        </div>
        <div className="stock-status">
          <span
            className={
              product.availabilityStatus === "In Stock"
                ? "in-stock"
                : "out-of-stock"
            }
          >
            {product.availabilityStatus}
          </span>
        </div>
      </div>

      <div className="product-content">
        <div className="product-header">
          <h3 className="product-title">{product.title}</h3>
          <span className="product-brand">{product.brand}</span>
        </div>

        <p className="product-description">{product.description}</p>

        <div className="product-tags">
          {product.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="product-rating">
          <div className="stars">{renderStars(product.rating)}</div>
          <span className="rating-text">
            ({product.rating}) • {product.reviews.length} reviews
          </span>
        </div>

        <div className="product-pricing">
          <div className="price-section">
            <span className="current-price">${discountedPrice.toFixed(2)}</span>
            <span className="original-price">${product.price.toFixed(2)}</span>
          </div>
          <div className="stock-info">Stock: {product.stock}</div>
        </div>

        <div className="product-details">
          <div className="detail-item">
            <span className="detail-label">Category:</span>
            <span className="detail-value">{product.category}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">SKU:</span>
            <span className="detail-value">{product.sku}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Weight:</span>
            <span className="detail-value">{product.weight}g</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Warranty:</span>
            <span className="detail-value">{product.warrantyInformation}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Shipping:</span>
            <span className="detail-value">{product.shippingInformation}</span>
          </div>
        </div>

        <div className="product-reviews">
          <h4>Recent Reviews:</h4>
          {product.reviews.slice(0, 2).map((review, index) => (
            <div key={index} className="review">
              <div className="review-header">
                <div className="review-stars">{renderStars(review.rating)}</div>
                <span className="reviewer-name">{review.reviewerName}</span>
              </div>
              <p className="review-comment">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
