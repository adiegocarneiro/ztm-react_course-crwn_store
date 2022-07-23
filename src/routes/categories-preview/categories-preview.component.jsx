import CategoryPreview from '../../components/category-preview/category-preview.component';
import { CategoriesContext } from '../../contexts/categories.context';
import { useContext, Fragment } from 'react';

const CategoriesPreview = () =>{
    const { categoriesMap } = useContext(CategoriesContext);
    const titles = Object.keys(categoriesMap);
    return(
        <Fragment>
        {
            titles.map((title)=>{
                const products = categoriesMap[title];
                return <CategoryPreview key={title} title={title} products={products}/>
            })
        }
        </Fragment>
    )
}

export default CategoriesPreview;