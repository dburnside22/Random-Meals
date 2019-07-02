import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import './Meal.scss';
import { Link } from "react-router-dom";
import {withRouter} from 'react-router-dom';
import { thisExpression } from '@babel/types';


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
            <h3 className="meal-header-detail">{this.state.meal.strMeal}</h3>
        ) : (
          <h3>No Meal Found</h3>
        );

        return (
            <div>
                <div className='navigation'>
                    <button className="back-button"><Link to={'/'}><FontAwesomeIcon icon={faArrowLeft} /></Link></button>
                    <button className="heart-button"><FontAwesomeIcon icon={faHeart} /></button>
                </div>
                <img className='meal-image' src={this.state.meal.strMealThumb} />
                {mealInfo}
                {ingredents}
                <h3>Directions</h3>
                {directions}
            </div>
        )
    }
}

export default Meal;
