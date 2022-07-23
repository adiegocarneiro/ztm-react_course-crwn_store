import './directory.styles.scss';
import DirectoryItem from "../directory-item/directory-item.component.jsx";

const Directory = ({categories})=>{
    return(
    <div className="directory-container">
        {
            categories.map((category,index)=>(
                <DirectoryItem key={category.id} category={category}/>
            ))
        }
    </div>
    )
}

export default Directory