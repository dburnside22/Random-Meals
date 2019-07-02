import React, { Component } from 'react';
import './Recipes.scss';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from "react-router-dom";

export class Recipes extends Component {
    componentDidMount() {
        if (this.props.meals.length == 0){
            let meals = [];
            for( let i = 0; i < 5; i++){
                axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
                .then(res => {
                    meals.push(res.data);
                    if (meals.length > 4){
                        this.props.dispatch({
                            type: 'CHANGERANDOMMEALS', 
                            payload: {
                              meals
                            }
                        });
                    } 
                });  
            }
        }
    }

    render() { 
        const mealsList = this.props.meals.length ? 
        (
            this.props.meals.map(mealItem => {
                const meal = mealItem.meals[0];
                return (
                    <div key={meal.idMeal} className='meal-item'>
                        <h3 className='meal-header'><Link to={'/' + meal.idMeal}>{meal.strMeal}</Link></h3>
                        <img className='meal-image' src={meal.strMealThumb} />
                    </div>
                )
            })
        ) : (
            <h5 className='meal-header'>Meals Loading ... </h5>
        )
        return (
            <div>
                <p className="recipe-of-the-day">Recipes of the day</p>
                <div className='meals-list'>{mealsList}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    meals: state.meals
});


export default connect(mapStateToProps)(Recipes);
