import { Link } from 'react-router-dom'
import './directory-item.styles.scss'

const DirectoryItem = ({category})=>{
    const { id, title, imageUrl } = category;
    return(
        <Link className="directory-item-container" key={id} to={`/shop/${title}`}>
          <div className="background-image"
            style={{
              backgroundImage:`url(${imageUrl})`
            }}
        />
          <div className="directory-item-body">
            <h2>{title}</h2>
            <p>Shop now</p>
          </div>
        </Link>
    )
}

export default DirectoryItem;