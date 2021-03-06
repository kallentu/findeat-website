﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Data.SqlClient;
using System.Web.Providers.Entities;

public partial class Account_Favorites : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e) {
        DatabaseEntities db = new DatabaseEntities();

        //TODO: let user pick how it's sorted -> may need date added
        //queries database for info, in ascending order with user specific saved
        var restaurants = from res in db.Restaurants
                          orderby res.DateAdded ascending
                          where res.UserName.Equals(User.Identity.Name)
                          select res;

        //displayed result, count for panel number on doc
        string result = "", options = "";
        var divCount = 0;


        foreach (var restaurant in restaurants)
        {
            result += "<div class = 'panel panel-default'>" +
                      "<div class = 'panel-heading col-md-12 row' onclick=\"displayDetails('" + restaurant.PlaceId + "', "+ divCount +")\">" + 
                      "<h3 class='panel-title col-md-10 col-md-offset-1'>"+ restaurant.Name + "</h3><i class='fa fa-angle-down fa-lg col-md-1' style='padding-top: 10px;'></i>" +
                      "</div>" +
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
            options += "<option value='" + restaurant.Name + "'>" + restaurant.Name + "</option>";
        }

        restaurantInfo.Text = result;
        optionsServer.Text = options;
    }

    protected void deleteDBEntry(object sender, EventArgs e)
    {
        SqlConnection sql = new SqlConnection(@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\KallenTu\Documents\findeat\App_Data\Database.mdf;Integrated Security=True");

        SqlCommand cmd = new SqlCommand();
        cmd.CommandType = System.Data.CommandType.Text;
        cmd.CommandText = "DELETE Restaurants WHERE Name = '" + Request.Form["delete"] + "'";
        cmd.Connection = sql;

        sql.Open();
        cmd.ExecuteNonQuery();
        sql.Close();

        //refreshes page to ensure updated data
        Response.Redirect(Request.RawUrl);
    }
}