const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class DishesController{
  async create(request, response) {
    const { title, description, category, price, ingredients } = request.body;

    const [dish_id] = await knex("dishes").insert({
      title,
      description,
      category,
      price
    });

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        name: ingredient,
        dish_id
      }
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.json(dish_id);
  }
  
  async delete(request, response) {
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.json();
  }

  async update(request, response) {
    const { title, description, category, price, ingredients } = request.body;
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    if(!dish) {
      throw new AppError("Prato não encontrado.")
    }
    
    dish.title = title ?? dish.title;
    dish.description = description ?? dish.description;
    dish.category = category ?? dish.category;
    dish.price = price ?? dish.price;

    await knex("dishes").where({ id }).update({
      title: dish.title,
      description: dish.description,
      category: dish.category,
      price: dish.price,
      updated_at: knex.fn.now()
    });

    if(ingredients) {
      const ingredientsUpdate = ingredients.map(ingredient => {
        return {
          name: ingredient,
          dish_id: id
        }
      });

      await knex("ingredients").where({ dish_id: id }).delete();
      await knex("ingredients").insert(ingredientsUpdate);
    }

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");

    return response.json({
      ...dish,
      ingredients
    })
  }

  async index(request, response) {
    const { search } = request.query;

    let dishes = [];

    dishes = await knex("dishes")
      .whereLike("title", `%${search}%`)
      .orderBy("title");

    if(dishes.length === 0) {
      dishes = await knex("ingredients")
        .select([
          "dishes.id",
          "dishes.title",
          "dishes.description",
          "dishes.category",
          "dishes.price",
          "dishes.image"
        ])
        .where("name", search)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .orderBy("dishes.title");
    }


    const dishesIngredients = await knex("ingredients");
    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredients = dishesIngredients.filter(ingredient => ingredient.dish_id === dish.id);

      return {
        ...dish,
        ingredients: dishIngredients
      }
    });
    
    return response.json(dishesWithIngredients);
  } 
}

module.exports = DishesController;