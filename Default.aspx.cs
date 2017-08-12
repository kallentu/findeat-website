using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Data.SqlClient;

public partial class _Default : Page
{
    //Adds new entry to local database
    protected void addDB (object sender, EventArgs e)
    {
        //updates the data required to the current restaurant information
        update.Update();

        SqlConnection sqlConnection = new SqlConnection(@"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\KallenTu\Documents\findeat\App_Data\Database.mdf;Integrated Security=True");
        SqlCommand cmd = new SqlCommand();
        cmd.CommandType = System.Data.CommandType.Text;
        cmd.CommandText = "INSERT Restaurants (PlaceId, Name, DateAdded) VALUES ('"+ placeIDServer.Value +"', '"+ nameServer.Value + "', '" + DateTime.Now.ToString() + "')";

        cmd.Connection = sqlConnection;
        sqlConnection.Open();
        cmd.ExecuteNonQuery();
        sqlConnection.Close();
    }
}