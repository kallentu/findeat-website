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

        //TODO: let user pick how it's sorted
        //queries database for info, in ascending order
        var restaurants = from res in db.Restaurants
                          orderby res.Id ascending
                          select res;

        //displayed result, count for panel number on doc
        string result = "";
        var divCount = 0;


        foreach (var restaurant in restaurants)
        {
            result += "<div class = 'panel panel-default'>" +
                      "<div class = 'panel-heading' onclick=\"displayDetails('" + restaurant.PlaceId + "', "+ divCount +")\">" + 
                      "<h3 class='panel-title'>"+ restaurant.Name + "</h3><span class='glyphicon glyphicon-chevron-down glyphicon-align-right'></span></div>" +
                      "<div class = 'panel-body'>" +
                      "<div class='address'></div>" +
                      "<div class='phone'></div>" +
                      "<div class='picture'></div>" +
                      "<div class='picture2'></div>" +
                      "<div class='picture3'></div>" +
                      "<table class='opening_hours'>" +
                      "<tr>" +
                      "<td>" +
                      "<div class='hours'></div>" +
                      "</td>" +
                      "<td>" +
                      "<h3 class='open'></h3>" +
                      "<h4 class='rating'></h4>" +
                      "</td>" +
                      "</tr>" +
                      "</table>" +
                      "<div class='directions'></div>" +
                      "</div>" +
                      "</div>";
            divCount++;
        }

        restaurantInfo.Text = result;
    }
}