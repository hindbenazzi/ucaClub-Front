import React from 'react'
import logo from './../../images/logoFST.png'

export default function LoginClt() {
    return (
        <div>
      <link rel="stylesheet" href="css/bootstrap.min.css" />
			<link rel="stylesheet" href="css/main.css" />
    <div className="miBody">
        <div className="cardLogin">
            <div>
                <a href="/">
                    <img className="login-logo" src={logo}  alt="Logo" />
                </a>
            </div>
            <div className="login-intro">
                <h1 className="text-center h3">Se connecter</h1>
                <p className="small text-center">Pour vous connectez, veuillez saisir votre identifiant et votre mot de passe</p>
            </div>
            <form action="#" className="signin-form">
                        <div className="form-group mb-3">
                        <label style={{color :'#727272' ,marginLeft: '5px'}}  for="name">N°Adhésion</label>
                        <input type="text" className="form-control inputS" placeholder="N°Adhésion" required/>
                        </div>
                        <a href="/reset-password" className="small text-danger permalink">Mot de passe oublié ?</a>
                        <div className="form-group">
                        <button type="submit" className="form-control btnS btn btn-primary rounded submit px-3" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Sign In</button>
                    </div>
            </form>
        </div>
    </div>


<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel"></h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>Svpl vérifie votre email, vous receverez un code de vérification :)</p>
        <form>
          <div className="form-group">
            <label  style={{color :'#727272'}}  for="recipient-name" className="col-form-label">Code de vérification :</label>
            <input type="text" className="form-control inputS" />
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary btnS">Envoyer</button>
      </div>
    </div>
  </div>
</div>
        </div>
    )
}
