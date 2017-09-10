using System;
using System.Web.UI;

using System.Data.SqlClient;

public partial class _Default : Page
{
    //Adds new entry to local database
    protected void addDB (object sender, EventArgs e)
    {
        //updates the data required to the current restaurant information
        //update.Update();

        SqlConnection sqlConnection = new SqlConnection(@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\Kalle\OneDrive\Documents\findeat\App_Data\Database.mdf;Integrated Security=True");
        SqlCommand cmd = new SqlCommand();
        cmd.CommandType = System.Data.CommandType.Text;
        cmd.CommandText = "INSERT Restaurants (PlaceId, Name, DateAdded) VALUES ('" + placeIDServer.Value + "', '" + nameServer.Value + "', '" + DateTime.Now.ToString() + "')";

        cmd.Connection = sqlConnection;
        sqlConnection.Open();
        cmd.ExecuteNonQuery();
        sqlConnection.Close();

        /*  for user specific favourites */
        //ensures user is logged in, in order to save

        //if (!User.Identity.IsAuthenticated)
        //{
        //    Response.Redirect("~/Account/Login.aspx", false);
        //}
        //else
        //{
        //    SqlConnection sqlConnection = new SqlConnection(@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\Kalle\OneDrive\Documents\findeat\App_Data\Database.mdf;Integrated Security=True");
        //    SqlCommand cmd = new SqlCommand();
        //    cmd.CommandType = System.Data.CommandType.Text;
        //    cmd.CommandText = "INSERT Restaurants (PlaceId, Name, DateAdded, UserName) VALUES ('" + placeIDServer.Value + "', '" + nameServer.Value + "', '" + DateTime.Now.ToString() + "', '"+ User.Identity.Name +"')";

        //    cmd.Connection = sqlConnection;
        //    sqlConnection.Open();
        //    cmd.ExecuteNonQuery();
        //    sqlConnection.Close();
        //}    

    }
}