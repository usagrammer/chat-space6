class UsersController < ApplicationController
  def index
    # return nil if params[:input] == ""
    # binding.pry
    @users = User.where(['name LIKE ?', "%#{params[:input]}%"] ).where.not(id: current_user.id).limit(10)
    # binding.pry
    render json: {users: @users}
    # respond_to do |format|
    #   format.html
    #   format.json
    # end
  end

  def edit

  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
