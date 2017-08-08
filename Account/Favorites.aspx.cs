using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Account_Favorites : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        DatabaseEntities db = new DatabaseEntities();

        //queries database for info
        var restaurants = db.Restaurants;

        string result = "";

        foreach (var restaurant in restaurants)
            result += "<div class = 'panel panel-default'>" +
                      "<div class = 'panel-heading'><h3 class='panel-title'>" + restaurant.Name + "</h3></div>" + 
                      "<div class = 'panel-body'>" + restaurant.Address + "</div>" +
                      "</div>";

        restaurantName.Text = result;
    }
}