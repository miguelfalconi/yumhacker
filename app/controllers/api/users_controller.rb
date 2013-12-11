class Api::UsersController < ApplicationController
  respond_to :json
  
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def unfollow
    current_user.unfollow!(params[:user_id])
    render :json => { following: current_user.following?(params[:user_id]) }
  end

  def follow
    current_user.follow!(params[:user_id])
    render :json => { following: current_user.following?(params[:user_id]) }
  end

  def followers
    @followers = User.find(params[:user_id]).followers
  end

  def followed_users
    @followed_users = User.find(params[:user_id]).followed_users
  end

  def following
    render :json => { following: current_user.following?(params[:user_id]) }
  end

  def unendorse
    current_user.unendorse!(params[:establishment_id])
    render :json => { endorsing: current_user.endorsing?(params[:establishment_id]) }
  end

  def endorse
    current_user.endorse!(params[:establishment_id])
    render :json => { endorsing: current_user.endorsing?(params[:establishment_id]) } 
  end

  def endorsing
    render :json => { endorsing: current_user.endorsing?(params[:establishment_id]) }
  end

  def endorsements
    @establishments = User.find(params[:user_id]).establishments
    render 'api/establishments/index'
  end

  # def create_photo
  #   if current_user 
  #     @photo = current_user.photos.create(establishment_id: params[:establishment_id], content_type: params[:content_type], original_filename: params[:original_filename], image_data: params[:image_data])
  #   else
  #     render json: {error: 'You must be logged in to add photos.'}
  #   end
  # end

  # def edit_photo_caption
  #   if current_user
  #     caption = params[:caption]
  #     if caption && !caption.blank?
  #       caption.strip!
  #       update_attributes(caption: caption)
  #       render json: { success: true }
  #     end
  #   end
  # end
end
