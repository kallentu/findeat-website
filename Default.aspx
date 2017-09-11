<%@ Page Title="find. eat." Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <section>
        <div class="container">
            <p>don't know where to eat? randomly find some food!</p>
            <p><strong>choose a category</strong>, click on the bar to <strong>set your distance</strong>, and <strong>search</strong> to start finding food.</p>

            <h3>categories</h3>
            <p>pick <strong>one</strong> category because you're probably craving something</p>

            <!-- buttons for different categories of food-->
            <div class="row">
                <button id="default" class="btn" value="null" onclick="return false;">default - surprise me</button>
            </div>

            <div class="row">
                <button class="btn" value="chinese" onclick="return false;" runat="server">chinese</button>
                <button class="btn" value="indian" onclick="return false;" runat="server">indian</button>
                <button class="btn" value="mexican" onclick="return false;" runat="server">mexican</button>
                <button class="btn" value="japanese" onclick="return false;" runat="server">japanese</button>
                <button class="btn" value="korean" onclick="return false;" runat="server">korean</button>
                <button class="btn" value="greek" onclick="return false;" runat="server">greek</button>
                <button class="btn" value="italian" onclick="return false;" runat="server">italian</button>
                <button class="btn" value="thai" onclick="return false;" runat="server">thai</button>
                <button class="btn" value="vietnamese" onclick="return false;" runat="server">vietnamese</button>
                <button class="btn" value="lebanese" onclick="return false;" runat="server">lebanese</button>
                <button class="btn" value="french" onclick="return false;" runat="server">french</button>
            </div>

            <div class="row">
                <button class="btn" value="fast+food" onclick="return false;" runat="server">fast food</button>
                <button class="btn" value="barbeque" onclick="return false;" runat="server">barbeque</button>
                <button class="btn" value="buffet" onclick="return false;" runat="server">buffet</button>
                <button class="btn" value="cafe" onclick="return false;" runat="server">cafe</button>
                <button class="btn" value="coffee" onclick="return false;" runat="server">coffee</button>
                <button class="btn" value="pub" onclick="return false;" runat="server">pub</button>
                <button class="btn" value="drive-thru" onclick="return false;" runat="server">drive-thru</button>
                <button class="btn" value="all+you+can+eat" onclick="return false;" runat="server">all you can eat</button>
                <button class="btn" value="vegetarian" onclick="return false;" runat="server">vegetarian</button>
                <button class="btn" value="vegan" onclick="return false;" runat="server">vegan</button>
            </div>

            <h3>distance</h3>
            <!--slider for distance 0.5 - 10km -->

            <p id="distanceDisplay">0.5km</p>

            <div class="row">
                <div class="col-xs-3 col-md-4 text-right">
                    <p>near</p>
                </div>
                <div class="col-xs-6 col-md-4">
                    <asp:TextBox ID="distance" runat="server" oninput="updateDistance(this.value)" type="range" min="500" value="500" max="10000" step="1" style="width:18vw;"></asp:TextBox>
                </div>
                <div class="col-xs-3 col-md-4 text-left">
                    <p>far</p>
                </div>
            </div>

            <!--button to send all information to be processed-->
            <button class="btn submit scroll" onclick="getLocation(); return false;" runat="server"><span class="glyphicon glyphicon-cutlery glyphicon-align-left"></span>&nbsp;&nbsp;find me some food!</button>

            <!-- updated information used to save on database, updated in Default.cs, input from script.js -->
            <%--<asp:UpdatePanel ID="update" runat="server" UpdateMode="Conditional">
                <ContentTemplate>
                    <asp:HiddenField ID="placeIDServer" runat="server"></asp:HiddenField>
                    <asp:HiddenField ID="nameServer" runat="server"></asp:HiddenField>
                </ContentTemplate>
            </asp:UpdatePanel>--%>
            <asp:HiddenField ID="placeIDServer" runat="server"></asp:HiddenField>
            <asp:HiddenField ID="nameServer" runat="server"></asp:HiddenField>

            <!-- restaurant information -->
            <div class="container info">
                <div class="restaurant"></div>
                <div class="address"></div>
                <div class="phone"></div>
                <div class="row text-center">
                    <div class="picture"></div>
                </div>
                
                <div class="row text-center justify-content-center" style="margin-top: 4vw;">
                    <div class="col-xs-3 col-md-4 col-md-offset-2 ">
                        <div class="picture2"></div>
                    </div>
                    <div class="col-xs-3 col-md-4">
                        <div class="picture3"></div>
                    </div>
                </div>
                <div class="row text-center justify-content-center" style="margin-top: 4vw;">
                    <div class="hours col-xs-6 col-md-3"></div>
                    <div class="col-xs-6 col-md-3" id="exInfo">
                        <h3 class="open"></h3>
                        <h4 class="rating"></h4>
                    </div>
                </div>
                <div class="directions"></div>

                <!-- adds current restaurant information to database -->
                <div id="hide">
                    <asp:Button OnClick="addDB" class="btn submit" runat="server" Text="save restaurant"></asp:Button>
                </div>
            </div>

        </div>
    </section>
</asp:Content>
