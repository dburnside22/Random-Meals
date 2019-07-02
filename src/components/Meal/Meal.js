import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import './Meal.scss';
import { Link } from "react-router-dom";


export class Meal extends Component {
    state = {
        meal : {}
    }

    componentDidMount() {
        const path = this.props.location.pathname;
        const linkId = path.substr(1, path.length);
        const linkUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + linkId; 
        axios.get(linkUrl)
            .then(res => {
                this.setState({
                    meal: res.data.meals[0]
                })
            })
    }

    render() {
        let ingredents = [];
        for(let i = 1; i < 21; i++){
            let strIngredientI = 'strIngredient' + i;
            let strMeasureI = 'strMeasure' + i;

            ingredents.push(<div className='ingredents' key={i}><strong>{this.state.meal[strMeasureI]}</strong> <span>{this.state.meal[strIngredientI]}</span></div>);
        }

        const directions = <div className='directions'>{this.state.meal.strInstructions}</div>;

        const mealInfo = this.state.meal.strMeal ?  (
            <span className="meal-header-detail">{this.state.meal.strMeal}</span>
        ) : (
          <span>No Meal Found</span>
        );

        return (
            <div>
                <div className='navigation'>
                    <button className="back-button"><Link to={'/'}><FontAwesomeIcon icon={faArrowLeft} /></Link></button>
                    <button className="heart-button"><FontAwesomeIcon icon={faHeart} /></button>
                </div>
                <div className='meal-layout'>
                    <div>
                        <img className='meal-image' src={this.state.meal.strMealThumb} alt={this.state.meal.strMeal}/>
                        <h2>{mealInfo}</h2>
                    </div>    
                    <div>
                        <h3>Ingredients</h3>
                        {ingredents}
                    </div>
                    <div className="directions">
                        <h3>Directions</h3>
                        {directions}
                    </div>    
                </div>
                
            </div>
        )
    }
}

export default Meal;
