import './category.styles.scss'
import { useParams } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    const { category } = useParams();
    const [ products, setProducts  ] = useState([]);

    useEffect(()=>{
        setProducts(categoriesMap[category]);
    },[category, categoriesMap])

    return(
        <Fragment>
            <h2 classname='title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {
                    products &&
                    products.map((product)=> <ProductCard key={product.id} product={product}/>)
                }
            </div>
        </Fragment>
    )
}

export default Category;