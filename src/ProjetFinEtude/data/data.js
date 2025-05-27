 export const menuData= [
    {
      "id_Menu": 1,
      "restaurant_id": 1,
      "name": "Burger Classique",
      "description": "Burger composé d'un steak de bœuf, salade, tomate, fromage, et sauce maison.",
      "price": 8.5,
      "category": "Burger",
      "image_url": "/imageMenu/BurgerClassique.png",
    },
    {
      "id_Menu": 2,
      "restaurant_id": 2,
      "name": "Tacos Poulet",
      "description": "Tacos garni de poulet grillé, salade, tomates, et sauce épicée.",
      "price": 7.0,
      "category": "Tacos",
      "image_url": "/imageMenu/TacosPoulet.png",
    },
    {
      "id_Menu": 3,
      "restaurant_id": 1,
      "name": "Pizza Margherita",
      "description": "Pizza avec une base tomate, mozzarella fraîche, basilic, et huile d'olive.",
      "price": 10.0,
      "category": "Pizza",
      "image_url": "/imageMenu/PizzaMargherita.png",
    },
    {
      "id_Menu": 4,
      "restaurant_id": 1,
      "name": "Sandwich Club",
      "description": "Sandwich composé de poulet grillé, bacon, salade, tomate, et mayonnaise.",
      "price": 6.5,
      "category": "Sandwich",
      "image_url": "/imageMenu/SandwichClub.png",
    },
    {
      "id_Menu": 5,
      "restaurant_id": 2,
      "name": "Burger Bacon",
      "description": "Burger avec du bœuf, fromage fondu, bacon croustillant, et sauce barbecue.",
      "price": 9.0,
      "category": "Burger",
      "image_url": "/imageMenu/BurgerBacon.png",
    },
    {
      "id_Menu": 6,
      "restaurant_id": 2,
      "name": "Tacos Veggie",
      "description": "Tacos végétarien avec légumes grillés, guacamole, et sauce au yaourt.",
      "price": 7.5,
      "category": "Tacos",
      "image_url": "/imageMenu/TacosVeggie.png",
    },
    {
      "id_Menu": 7,
      "restaurant_id": 1,
      "name": "Pizza Pepperoni",
      "description": "Pizza garnie de pepperoni, mozzarella, et sauce tomate.",
      "price": 11.0,
      "category": "Pizza",
      "image_url": "/imageMenu/PizzaPepperoni.png",
    },
    {
      "id_Menu": 8,
      "restaurant_id": 1,
      "name": "Sandwich Jambon Fromage",
      "description": "Sandwich chaud avec jambon, fromage fondu, et beurre.",
      "price": 5.5,
      "category": "Sandwich",
      "image_url": "/imageMenu/SandwichJambonFromage.png",
    },
    {
      "id_Menu": 9,
      "restaurant_id": 2,
      "name": "Burger Double Cheese",
      "description": "Double burger avec deux steaks, double fromage, laitue, et cornichons.",
      "price": 10.5,
      "category": "Burger",
      "image_url": "/imageMenu/BurgerDoubleCheese.png",
    },
    {
      "id_Menu": 10,
      "restaurant_id": 2,
      "name": "Pizza Végétarienne",
      "description": "Pizza avec poivrons, champignons, olives, oignons, et mozzarella.",
      "price": 9.5,
      "category": "Pizza",
      "image_url": "/imageMenu/PizzaVegetarienne.png",
    }
  ]

  export const User=[
    {
      id_User:1,
      name:'abdo',
      email:'abdo@exemple.com',
      password:'jinoski2025',
      role:'client',
      image:'user.png'
    },
    {
      id_User:2,
      name:'omar',
      email:'omar@exemple.com',
      password:'ivan2025',
      role:'Owner',
      image:'user.png'
    },
    {
      id_User:3,
      name:'yassin',
      email:'yassin@exemple.com',
      password:'lwagandi2025',
      role:'client',
      image:'user.png'
    },
    {
      id_User:4,
      name:'ayoub',
      email:'ayoub@exemple.com',
      password:'winxo2025',
      role:'Owner',
      image:'user.png'
    },
    {
      id_User:5,
      name:'hicham',
      email:'hicham@exemple.com',
      password:'mesco2025',
      role:'client',
      image:'user.png'
    },
  ]

  export const Restaurants=[
    {
      id_Resto:1,
      User_id:2,
      name_Resto:'ba mbark',
      description:'Pizza clásica con tomate, mozzarella y albahaca.Pizza clásica con tomate, mozzarella y albahaca.Pizza clásica con tomate, mozzarella y albahaca.Pizza clásica con tomate, mozzarella y albahaca.Pizza clásica con tomate, mozzarella y albahaca.Pizza clásica con tomate, mozzarella y albahaca.Pizza clásica con tomate, mozzarella y albahaca.Pizza clásica con tomate, mozzarella y albahaca.',
      tele_Resto:'0678455131',
      image_Resto:'RestoLogo1.png'
    },
    {
      id_Resto:12,
      User_id:4,
      name_Resto:'dar Jawda',
      description:'Pizza clásica con tomate, mozzarella y albahaca.Pizza clásica con tomate, mozzarella y albahaca.Pizza clásica con tomate, mozzarella y albahaca.Pizza clásica con tomate, mozzarella y albahaca.Pizza clásica con tomate, mozzarella y albahaca.Pizza clásica con tomate, mozzarella y albahaca.Pizza clásica con tomate, mozzarella y albahaca.Pizza clásica con tomate, mozzarella y albahaca.',
      tele_Resto:'0611235488',
      image_Resto:'RestoLogo2.png'
    },
  ]

  export const Reviews=[
    {
      id_Review:1,
      user_id:1,
      Menu_id:5,
      rating:5,
      comment:'hadxi nadi tbark lah 3likom'
    },
    {
      id_Review:2,
      user_id:5,
      Menu_id:5,
      rating:2,
      comment:'mabix'
    },
    {
      id_Review:3,
      user_id:3,
      Menu_id:5,
      rating:3,
      comment:'zwin xwya'
    },
  ]