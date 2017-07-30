<%@ Page Title="Contact" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Contact.aspx.cs" Inherits="Contact" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <section class="contact">
        <h2><%: Title %>.</h2>
        <!-- TODO: Insert github -->
        <p>if there are any questions or concerns about <strong>find.eat.</strong>, feel free to contact me.</p>

        <address>
            <strong>Email:</strong>   <a href="mailto:Support@example.com">kallentu@gmail.com</a><br />
        </address>
    </section>
</asp:Content>
